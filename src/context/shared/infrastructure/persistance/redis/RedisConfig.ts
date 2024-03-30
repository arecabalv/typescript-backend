type RedisConfig = { url: string, username?: string, password?: string, name?: string, database?: number, commandsQueueMaxLength?: number, disableOfflineQueue?: boolean, readonly?: boolean, }

export default RedisConfig;
