const functions = {
    ping(req, res) {
        res.status(200).send("Server Operational");
    },
    helloWorld(req, res) {
        res.status(200).send("Hello World");
    },
    async dummyData(req, res) {
        const data = {
            message: "Dummy Data",
            client: {
                CSID: 1123,
                customerName: "Barclays international",
                relationshipManager: "Adam Streeter",
                payments: 21,
                value: 1129834790.67,
                stpRate: 0.1256,
                clientRating: 13, //for now out of 100 tbd
                comments: [
                    {
                        text: "very high value",
                        positive: true
                    },
                    {
                        text: "Low str rate",
                        positive: false
                    },
                ],
                improvements: [
                    "Pay their BA2s more"
                ],
            }
        }
        res.status(200).send(data)
    }

}

export default functions;