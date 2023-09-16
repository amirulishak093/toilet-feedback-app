import type { Actions } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { createRating } from '$lib/server/rating.service';

export function load(event: RequestEvent) {
	const site = event.params.site;
	const location = event.params.location;

	return { site, location };
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const score = parseInt(formData.get('score') as string);
		const site = String(formData.get('site')) ?? '';
		let location = String(formData.get('location')) ?? '';
		const issues = String(formData.get('issues')) ?? '';

		let issuesString = '';

		issuesString = issues.split(' ').join('+');

		if (location.includes('ad')) {
			location = location.replace('ad', 'ta');
		}

		try {
			const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSfUNAgIa1LhnGgZnspNHM61l2OD2ocUoGeUtKwTjihpvVVVYA/formResponse?usp=pp_url&entry.548810060=${site}&entry.593591537=${location}&entry.1353359401=${score}&entry.354039033=${issuesString}`;

			await fetch(prefilledLink);
			await createRating({ data: { score, site, location, issues } });

			return {
				success: true,
				status: 'Form is submitted'
			};
		} catch (error) {
			console.log(error);

			return {
				error,
				score
			};
		}
	}
};
