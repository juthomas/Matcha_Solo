import {useEffect, useState} from 'react'

const PREFIX = 'meater-';

function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;
	const [value, setValue] = useState(() => {
		// localStorage.
		
		const jsonValue = localStorage.getItem(prefixedKey);
		console.log("Error : " + typeof jsonValue);
		if (jsonValue !== null && jsonValue !== 'undefined')
		{
			console.log(jsonValue);
		}
	})
	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);
	return ([value, setValue]);
}

export default useLocalStorage
