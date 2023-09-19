<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { isLoading, isFeedbackForm, issues } from '$lib/store';
	import { fade, fly } from 'svelte/transition';

	export let data;
	export let form;

	function openFeedbackForm() {
		$isFeedbackForm = true;
	}

	function closeFeedbackForm() {
		$isFeedbackForm = false;
	}

	function setLoading(callback: Function, timeout?: number) {
		$isLoading = true;
		setTimeout(() => {
			$isLoading = false;
			callback();
		}, timeout);
	}

	function selectIssue(index: number) {
		$issues[index].checked = !$issues[index].checked;
	}

	$: currentIssues = $issues
		.filter((issue) => issue.checked)
		.map((issue) => issue.name)
		.join(', ');

	function clearIssues() {
		$issues = $issues.map((issue) => ({
			...issue,
			checked: false
		}));
		currentIssues = '';
	}
</script>

<div class="wrapper">
	{#if !form?.success}
		{#if !$isFeedbackForm}
			<!-- Main Form -->
			<form
				method="POST"
				use:enhance={() => {
					$isLoading = true;
					return async ({ result }) => {
						$isLoading = false;
						await applyAction(result);
					};
				}}
			>
				<div class="text-center font-bold text-xl">How Was Your Experience?</div>

				<div class="flex flex-col gap-y-4 mt-4">
					<button
						name="score"
						value={2}
						type="submit"
						class="group flex flex-col items-center border hover:border-[#008480] bg-white rounded-xl py-6 px-4 transition-colors"
					>
						<img
							class="w-36 group-hover:scale-105 transition-transform"
							src="/images/excellent-emoji.png"
						/>
						<div
							class="group-hover:bg-[#008480] group-hover:text-[#fff] rounded-full border py-3 px-6 mt-4 font-medium transition-colors"
						>
							Excellent
						</div>
					</button>

					<button
					name="score"
					value={1}
					type="submit"
					class="group flex flex-col items-center border hover:border-[#008480] bg-white rounded-xl py-6 px-4 transition-colors"
				>
					<img
						class="w-36 group-hover:scale-105 transition-transform"
						src="/images/good-emoji.png"
					/>
					<div
						class="group-hover:bg-[#008480] group-hover:text-[#fff] rounded-full border py-3 px-6 mt-4 font-medium transition-colors"
					>
						Good
					</div>
				</button>

					<button
						name="score"
						value={0}
						type="submit"
						class="group flex flex-col items-center border hover:border-[#008480] bg-white rounded-xl py-6 px-4 transition-colors"
					>
						<img
							class="w-36 group-hover:scale-105 transition-transform"
							src="/images/neutral-emoji.png"
						/>
						<div
							class="group-hover:bg-[#008480] group-hover:text-[#fff] rounded-full border py-3 px-6 mt-4 font-medium transition-colors"
						>
							Average
						</div>
					</button>

					<button
						type="button"
						on:click={() => {
							setLoading(openFeedbackForm, 1000);
						}}
						name="score"
						value={-1}
						class="group flex flex-col items-center border hover:border-[#008480] bg-white rounded-xl py-6 px-4 transition-colors"
					>
						<img
							class="w-36 group-hover:scale-105 transition-transform"
							src="/images/poor-emoji.png"
						/>
						<div
							class="group-hover:bg-[#008480] group-hover:text-[#fff] rounded-full border py-3 px-6 mt-4 font-medium transition-colors"
						>
							Poor
						</div>
					</button>

					<button
						type="button"
						on:click={() => {
							setLoading(openFeedbackForm, 1000);
						}}
						name="score"
						value={-1}
						class="group flex flex-col items-center border hover:border-[#008480] bg-white rounded-xl py-6 px-4 transition-colors"
					>
						<img
							class="w-36 group-hover:scale-105 transition-transform"
							src="/images/very-poor-emoji.png"
						/>
						<div
							class="group-hover:bg-[#008480] group-hover:text-[#fff] rounded-full border py-3 px-6 mt-4 font-medium transition-colors"
						>
							Very Poor
						</div>
					</button>

					<input name="site" type="hidden" value={data.site} />
					<input name="location" type="hidden" value={data.location} />
				</div>
			</form>
		{:else}
			<!-- Feedback Form -->

			<form
				method="POST"
				use:enhance={() => {
					$isLoading = true;
					return async ({ result }) => {
						$isLoading = false;
						await applyAction(result);
					};
				}}
			>
				<div class="text-center font-bold text-xl">Feedback</div>
				<div class="text-center font-medium">
					Select at least <span class="font-bold">one</span> of the issues
				</div>

				<div class="flex flex-col gap-y-2 mt-4">
					<button
						type="button"
						on:click={() => {
							selectIssue(0);
						}}
						class="group flex items-center border-2 {$issues[0].checked
							? 'border-[#008480]'
							: ''} bg-white rounded-xl p-4 transition-colors"
					>
						<img class="w-12" src="/images/toilet-paper.png" />
						<div class="flex-1 transition-colors">No Toilet Paper</div>
					</button>
					<button
						type="button"
						on:click={() => {
							selectIssue(1);
						}}
						class="group flex items-center border-2 {$issues[1].checked
							? 'border-[#008480]'
							: ''} bg-white rounded-xl p-4 transition-colors"
					>
						<img class="w-12" src="/images/cleaning.png" />
						<div class="flex-1 transition-colors">Dirty</div>
					</button>
					<button
						type="button"
						on:click={() => {
							selectIssue(2);
						}}
						class="group flex items-center border-2 {$issues[2].checked
							? 'border-[#008480]'
							: ''} bg-white rounded-xl p-4 transition-colors"
					>
						<img class="w-12" src="/images/soap-dispenser.png" />
						<div class="flex-1 transition-colors">No Hand Soap</div>
					</button>
					<button
						type="button"
						on:click={() => {
							selectIssue(3);
						}}
						class="group flex items-center border-2 {$issues[3].checked
							? 'border-[#008480]'
							: ''} bg-white rounded-xl p-4 transition-colors"
					>
						<img class="w-12" src="/images/odor.png" />
						<div class="flex-1 transition-colors">Bad Smell</div>
					</button>

					<input name="site" type="hidden" value={data.site} />
					<input name="location" type="hidden" value={data.location} />
					<input name="score" type="hidden" value={-1} />
					<input name="issues" type="hidden" bind:value={currentIssues} />

					<!-- Bottom Pane -->
					<div class="fixed left-0 bottom-0 bg-white w-full border-t py-3">
						<div class="wrapper flex gap-x-1">
							<button
								type="button"
								on:click={() => {
									clearIssues();
									setLoading(closeFeedbackForm, 1000);
								}}
								class="bg-white text-[#008480] rounded-full border py-3 px-6 font-medium transition-colors"
							>
								Back
							</button>
							<button
								type="submit"
								class="flex-1 bg-[#008480] text-[#fff] rounded-full border py-3 px-6 font-medium transition-colors"
							>
								Submit Feedback
							</button>
						</div>
					</div>
				</div>
			</form>
		{/if}
	{:else}
		<div class="text-center font-bold text-xl">Thank You</div>
		<div class="text-center font-medium">Your response has been submitted</div>

		<div class="flex flex-col items-center">
			<div class="py-6"><img alt="Thumbs up" class="w-36" src="/images/thumbs-up.png" /></div>

			<a
				href="https://www.medivest.com.my/"
				class="flex gap-x-2 items-center border border-[#008480] px-4 py-2 rounded-full mt-4"
			>
				<img alt="Logo" class="w-5 sm:w-7" src="/images/logo2.png" />
				<span class="text-[#008480] font-medium">medivest.com.my</span>
			</a>
		</div>
	{/if}
</div>
