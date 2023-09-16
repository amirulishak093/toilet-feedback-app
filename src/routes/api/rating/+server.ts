import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { createRating, getRatings, updateRating } from '$lib/server/rating.service';
import type { Prisma } from '@prisma/client';

export async function POST(event: RequestEvent) {
	try {
		const { score, location, site, issues } = await event.request.json();

		await createRating({
			data: {
				score,
				location,
				site,
				issues
			}
		});

		return json({ success: true });
	} catch (error) {
		console.error('Error creating rating:', error);
		return json(
			{ success: false, error: 'An error occurred while creating the rating.' },
			{ status: 500 }
		);
	}
}

export async function PATCH(event: RequestEvent) {
	try {
		const { id, score, location, site, issues } = await event.request.json();

		await updateRating({
			where: { id },
			data: {
				score,
				location,
				site,
				issues
			}
		});

		return json({ success: true });
	} catch (error) {
		console.error('Error updating rating:', error);
		return json(
			{ success: false, error: 'An error occurred while updating the rating.' },
			{ status: 500 }
		);
	}
}

export async function GET(event: RequestEvent) {
	try {
		const params = event.url.searchParams;

		const orderBy = params.get('orderBy');
		const site = params.get('site');
		const location = params.get('location');
		const take = Number(params.get('take'));
		const skip = Number(params.get('skip'));

		const options: Prisma.RatingFindManyArgs = {
			orderBy: {
				[orderBy || 'createdAt']: 'desc'
			},
			where: {
				site: site || undefined,
				location: location || undefined
			},
			take: take || undefined,
			skip: skip || undefined
		};

		const ratings = await getRatings(options);

		// Return the fetched ratings
		return json(ratings);
	} catch (error) {
		console.error('Error fetching ratings:', error);
		return json({ error: 'An error occurred while fetching ratings.' }, { status: 500 });
	}
}
