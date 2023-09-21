import { writable } from 'svelte/store';

export const isLoading = writable<boolean>();
export const isFeedbackForm = writable<boolean>();
export const issues = writable<Array<{ name: string; checked: boolean }>>();

isLoading.set(false);
isFeedbackForm.set(false);
issues.set([
	{ name: 'No Toilet Paper', checked: false },
	{ name: 'Dirty', checked: false },
	{ name: 'Empty Hand Soap', checked: false },
	{ name: 'Bad Smell', checked: false },
	{ name: 'No Lights/Dark', checked: false },
	{ name: 'Water Leakage', checked: false },
	{ name: 'Slippery Floor', checked: false }
]);
