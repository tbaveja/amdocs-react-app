const initialState: any = [];
export default function reducer (currentState = initialState, action: any) {
  console.log("Reducer Invoked");
  switch (action.type) {
    case "SET_DATA":
      return action.payload;
  }
}
