const functions = {
    ping(req, res) {
        res.status(200).send("Server Operational");
    },
    helloWorld(req, res) {
        res.status(200).send("Hello World");
    },
    async dummyData(req, res) {
        const csid = req.params.csid; // Access the csid from the URL
        console.log("CSID:", csid);
        const data = {
            message: "Dummy Data",
            client: {
                CSID: csid,
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