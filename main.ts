import { Application } from '@oak/oak';
import router from './src/routes/allRoutes.ts';
const app = new Application();
const PORT = Deno.env.get('PORT') || 8000;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${PORT}`);
await app.listen({ port: +PORT });
