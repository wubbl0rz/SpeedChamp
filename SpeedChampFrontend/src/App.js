import React, { useState } from "react";
import axios from "axios";
import StatsItem from "./StatsItem";

const selectOptions = [
	// { value: 10 * Math.pow(2, 20), label: "10 MB" },
	{ value: 20_000_000, label: "20 MB" },
	// { value: 100 * Math.pow(2, 20), label: "100 MB" },
	// { value: 1000 * Math.pow(2, 20), label: "1000 MB" }
];

// const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000": "https://speedchamp.org";
const BASE_URL = "https://speedchamp.org";

const App = () => {
	const [meta, setMeta] = useState({
		size: selectOptions[0].value
	});

	const [result, setResult] = useState({
		duration: undefined,
		upload: undefined,
		download: undefined
	});

	const initArray = () => {
		let myArray = new ArrayBuffer(meta.size);
		let longInt8View = new Uint8Array(myArray);

		// generate some data
		for (let i = 0; i < longInt8View.length; i++) {
			longInt8View[i] = i % 256;
		}

		return longInt8View;
	};

	const start = async () => {
		const data = initArray();
		const start = new Date();

		await axios.get(`${BASE_URL}/down`, {
			onDownloadProgress: (progressEvent) => {
				setResult(result => ({
					...result,
					download: calculateSpeed(progressEvent, start)
				}))
			}
		});

		axios.post(`${BASE_URL}/up`, Buffer.from(data), {
			headers: { "Content-Type": "text/octet-stream" },
			onUploadProgress: (progressEvent) => {
				setResult(result => ({
					...result,
					upload: calculateSpeed(progressEvent, start)
				}))
			}
		})
		.then(response => {
			/* const end = new Date();
			const duration = end - start;

			setResult(result => ({
				...result,
				duration
			})); */
		});
	};

	const calculateSpeed = (pe, start) => {
		const now = new Date();

		/* if (!(pe.lengthComputable && pe.total > 0)) {
			return undefined;
		} */

		console.log(pe, start);

		let bps = pe.loaded / ((now - start) / 1000);
		let mbps = bps / 1024 / 1024 * 8;

		return mbps;
	};

	const formatBytes = (bytes, decimals = 2) => {
		if (bytes === 0) {
			return "0 Bytes";
		}

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	};

	// console.log(result);

	return (
		<div className="mx-auto w-3/5 space-y-12">
			{/* <img src="/kekw.jpg" className="w-1/5 mt-12 mx-auto" /> */}
			<h1 className="text-4xl font-bold text-center mt-6">SpeedChamp</h1>
			<div className="text-center space-y-3">
				<button
					className="px-6 py-3 text-center bg-blue-600 font-bold text-white rounded"
					onClick={() => start()}
				>
					Speedtest starten
				</button>
				<select value={meta.size} onChange={e => setMeta({ ...meta, size: e.target.value })} className="block mx-auto">
					{selectOptions.map(option =>(
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</select>
			</div>
			<div className="grid grid-cols-3 gap-6 text-center">
				<StatsItem prefix="Ping" suffix="ms">
					-
				</StatsItem>
				<StatsItem prefix="Download" suffix="Mbit/s">
				{!!result.download ? (
						<span>{result.download.toFixed(2)}</span>
					) : "-"}
				</StatsItem>
				<StatsItem prefix="Upload" suffix="Mbit/s">
					{!!result.upload ? (
						<span>{result.upload.toFixed(2)}</span>
					) : "-"}
				</StatsItem>
			</div>
			{!!result.duration && (
				<div className="text-center">
					Dauer
					<div className="text-3xl font-bold">
						{result.duration / 1000}s
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
