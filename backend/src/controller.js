

const functions =  {
    ping(req, res){
        res.status(200).send("Server Operational");
    },
    helloWorld(req, res){
        res.status(200).send("Server Operational");
    }

}

export default functions;