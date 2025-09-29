import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

// Clean up after all tests are done.
afterAll(() => server.close());
