import React, { useState } from "react";
import axios from "axios";
import StatsItem from "./StatsItem";

const selectOptions = [
	// { value: 10 * Math.pow(2, 20), label: "10 MB" },
	{ value: 20_000_000, label: "20 MB" },
	{ value: 100 * Math.pow(2, 20), label: "100 MB" },
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

	const start = () => {
		const data = initArray();
		const start = new Date();

		axios.post(`${BASE_URL}/speedchamp`, Buffer.from(data), {
			onUploadProgress: (progressEvent) => {
				calculateSpeed(progressEvent, start);
			},
			onDownloadProgress: (progressEvent, start) => {

			}
		})
		.then(response => {
			const end = new Date();
			const duration = end - start;

			setResult(result => ({
				...result,
				duration
			}));
		})
	};

	const calculateSpeed = (pe, start) => {
		const now = new Date();

		if (pe.lengthComputable && pe.total > 0) {
			let bps = pe.loaded / ((now - start) / 1000);
			let mbps = bps / 1024 / 1024 * 8;

			setResult(result => ({
				...result,
				upload: mbps
			}));
		}
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

	return (
		<div className="mx-auto w-3/5 space-y-12">
			<h1 className="text-4xl font-bold pt-6 text-center">SpeedChamp</h1>
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
						<span>{result.upload.toFixed(2)}</span>
					) : "-"}
				</StatsItem>
				<StatsItem prefix="Upload" suffix="Mbit/s">
					{!!result.upload ? (
						<span>{result.upload.toFixed(2)}</span>
					) : "-"}
				</StatsItem>
			</div>
			{!!result.duration && (
				<div className="text-center text-3xl font-bold">
					{result.duration / 1000}s
				</div>
			)}
		</div>
	);
};

export default App;
