

export function CreatorCard() {
    return (
        <div className="flex items-center space-x-4">
            <div className="size-16 rounded-full bg-gray-300" />
            <div>
                <p className="font-medium">Creator Name</p>
                <p className="text-sm text-muted-foreground">@creatorhandle</p>
            </div>
        </div>
    );
}