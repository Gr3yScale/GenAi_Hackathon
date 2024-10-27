
//when changing this lmk as i can update the frontend version of it as well
export type ClientData = {
    CSID: string,
    customerName: string,
    relationshipManager: string,
    payments: number,//no. payments
    value: number, //number in pounds to be render in thousands/millions on the front end
    stpRate: number, //0-1 redered as %
    clientRating: number, //number out of TBD
    comments?: Comment[],
    improvements?: string[],
}

export type Comment = {
    text: string,
    positive: boolean, //true if positive false if negative
}

//the request the frontend will send
export type CSIDrequest = {
}

//what the server will respond with if all is good
export type ClientDataResponce = {
    message?: string,
    client: ClientData
}
