import { getCreator } from "../actions";


export async function CreatorCard({params}: {params: Record<string, string>}) {
    const creator = await getCreator(params.handlename);
    console.log(creator);

    if (!creator) {
        return <div>Creator not found</div>;
    }

  return (
    <div className="flex items-center space-x-4">
      <div className="size-16 rounded-full bg-gray-300" />
      <div>
        <p className="font-medium">{creator.username}</p>
        <p className="text-sm text-muted-foreground">{creator.display_name}</p>
      </div>
    </div>
  );
}
