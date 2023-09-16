import { db } from './db';
import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

export async function createRating({ data }: Prisma.RatingCreateArgs<DefaultArgs>) {
	try {
		const createdRating = await db.rating.create({ data });
		return createdRating;
	} catch (error) {
		console.error('Error creating rating:', error);
		throw new Error('Failed to create rating');
	}
}

export async function updateRating({ where, data }: Prisma.RatingUpdateArgs<DefaultArgs>) {
	try {
		const updatedRating = await db.rating.update({
			where,
			data
		});
		return updatedRating;
	} catch (error) {
		console.error('Error updating rating:', error);
		throw new Error('Failed to update rating');
	}
}

export async function getRatings({
	orderBy = {},
	where = {},
	take = undefined,
	skip = undefined
}: Prisma.RatingFindManyArgs = {}) {
	try {
		const ratings = await db.rating.findMany({
			orderBy,
			where,
			take,
			skip
		});
		return ratings;
	} catch (error) {
		console.error('Error fetching ratings:', error);
		throw new Error('Failed to fetch ratings');
	}
}
