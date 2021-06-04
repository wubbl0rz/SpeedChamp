import React, { useState } from "react";
import axios from "axios";
import StatsItem from "./StatsItem";

const selectOptions = [
	{ value: 10 * Math.pow(2, 20), label: "10 MB" },
	{ value: 100 * Math.pow(2, 20), label: "100 MB" },
	{ value: 1000 * Math.pow(2, 20), label: "1000 MB" }
];

const App = () => {
	const [meta, setMeta] = useState({
		size: selectOptions[0].value
	});

	const [result, setResult] = useState({
		duration: undefined
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
		const start = new Date();
		const data = initArray();

		axios.post("http://localhost:5000/speedchamp", {}, {
			onUploadProgress: (progressEvent) => {
				console.log("on upload");
				calculateSpeed(progressEvent);
			},
			onDownloadProgress: (progressEvent) => {
				console.log("on download");
				console.log(progressEvent);
			}
		})
		.then(response => {
			const end = new Date();
			const duration = end - start;

			setResult({
				...result,
				duration
			});
		})
	};

	const calculateSpeed = (pe) => {
			console.log(pe.loaded, "von", pe.total);
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
					onClick={start}
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
					12
				</StatsItem>
				<StatsItem prefix="Download" suffix="Mbit/s">
					554
				</StatsItem>
				<StatsItem prefix="Upload" suffix="Mbit/s">
					123
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
