<script>
	import { clientLogger } from '$lib/monitoring/client/logger';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let catFact = $state('');
	let loading = $state(false);
	let error = $state('');

	async function getCatFact() {
		loading = true;
		error = '';

		clientLogger.info('User clicked get cat fact button', {
			timestamp: new Date().toISOString()
		});

		try {
			const response = await fetch('/api/cat-fact');
			const data = await response.json();

			if (!response.ok || !data.success) {
				throw new Error(data.error || 'Failed to fetch cat fact');
			}

			catFact = data.fact;

			clientLogger.info('Cat fact received successfully', {
				factLength: data.fact.length,
				preview: data.fact.substring(0, 50)
			});
		} catch (err) {
			error = err.message;

			clientLogger.error('Failed to get cat fact', {
				error: err.message,
				stack: err.stack
			});
		} finally {
			loading = false;
		}
	}
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Cat Facts & (Data) Dogs ;)</Card.Title>
		<Card.Description>Server and Client Side Log Example</Card.Description>
	</Card.Header>
	<Card.Content></Card.Content>
	<Card.Footer class="flex-col gap-2">
		{#if catFact}
			<div>
				<p>{catFact}</p>
			</div>
		{/if}

		<Button onclick={getCatFact} disabled={loading} class="w-full hover:cursor-pointer">
			{loading ? 'Loading...' : 'Fetch Cat Fact'}
		</Button>
	</Card.Footer>
</Card.Root>
