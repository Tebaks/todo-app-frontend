import { provider } from "../../../pact";
import { getTodos } from "../../api/client";
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { eachLike } = require("@pact-foundation/pact").Matchers;

const expect = chai.expect;

chai.use(chaiAsPromised);

describe("Pact with Todo API", () => {
  beforeAll(() =>
    provider.setup().then((opts) => {
      process.env.API_PORT = opts.port;
    })
  );

  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe("when request to get all todos", () => {
    const itemProperties = {
      id: "673ca932-7ac2-4fa0-8db5-c277da97379a",
      todo: "Learn Testing",
      done: false,
    };
    beforeAll(() => {
      return provider.addInteraction({
        state: "there are todos",
        uponReceiving: "a request for todos",
        withRequest: {
          path: "/",
          method: "GET",
        },
        willRespondWith: {
          body: eachLike(itemProperties),
          status: 200,
        },
      });
    });
    it("will receive list of todos", async () => {
      const res = await getTodos();
      return expect(res[0].todo).equal("Learn Testing");
    });
  });
});
