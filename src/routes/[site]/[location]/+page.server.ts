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

		if (!location.includes('ta1' || 'ta2')) {
			return {
			    success: false,
			    status: 'Location is not found'
			}
		}

		try {
			const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSdKvFtTBo5LsiGnUcuru6XqnkbO_vbx4H5IJWH2nW-LeZuOZA/formResponse?usp=pp_url&entry.647138747=${site}&entry.353172185=${location}&entry.260921235=${score}&entry.642668930=${issuesString}`

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
