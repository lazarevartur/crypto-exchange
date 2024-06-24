// utils/cache.ts
import NodeCache from "node-cache";

// Экземпляр NodeCache с настройками
const cache = new NodeCache({ stdTTL: 60 * 5 });

export default cache;
