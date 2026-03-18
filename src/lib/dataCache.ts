type CacheTag = "users" | "creators";

export function getGlobalTag(tag: CacheTag) {
    return `global:${tag}` as const;
}

export function getUserTag(tag: CacheTag, userId: string) {
    return `user:${userId}:${tag}` as const;
}

export function getCreatorTag(tag: CacheTag, creatorId: string) {
    return `creator:${creatorId}:${tag}` as const;
}