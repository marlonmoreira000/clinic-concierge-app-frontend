import { mockServer } from "./mocks/server";

beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());
