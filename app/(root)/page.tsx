import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/quries";
import { client } from "@/sanity/lib/client";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

	const posts = await client.fetch(STARTUPS_QUERY);
	// console.log(JSON.stringify(posts, null, 2));

	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Startup, <br />
					Connect With Entrepreneurs
				</h1>
				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions.
				</p>
				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search Results For "${query}"` : "All Startups"}
				</p>

				<ul className="mt-7 card_grid">
					{posts?.length > 0 ? (
						posts.map((post: StartupCardType, i: number) => (
							<StartupCard key={post?._id} post={post} />
						))
					) : (
						<p className="no-results">No Startups found</p>
					)}
				</ul>
			</section>
		</>
	);
}
