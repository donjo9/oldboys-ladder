import { Environment, Network, RecordSource, Store } from "relay-runtime";

function fetchQuery(operations, variables) {
    return fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: operations.text, variables })
    }).then(respons => respons.json());
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource())
});

export default environment;
