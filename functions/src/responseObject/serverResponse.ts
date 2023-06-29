// type defaultServerResponseObject = {
//     status:number
//     data:any
// }

export default function createServerResponse(data: any) {
  return {
    status: 200,
    data: data,
  };
}
