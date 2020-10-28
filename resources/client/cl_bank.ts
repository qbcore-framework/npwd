import events from '../utils/events';


onNet(events.BANK_SEND_TRANSFERS, (transfer: any) => {
  SendNuiMessage(
    JSON.stringify({
      app: "BANK",
      method: "setTransaction",
      data: transfer
    })
  )
})

onNet(events.BANK_SEND_CREDENTIALS, (credentials: any) => {
  console.log("Client:", credentials.balance, credentials.name)
  SendNuiMessage(
    JSON.stringify({
      app: "BANK",
      method: "setCredentials",
      data: credentials
    })
  )
})

RegisterNuiCallbackType(events.BANK_ADD_TRANSFER);
on(`__cfx_nui:${events.BANK_ADD_TRANSFER}`, (data: any) => {
  const transfer = data;
  emitNet(events.BANK_ADD_TRANSFER, transfer)

  setTimeout(() => {
    emitNet(events.BANK_FETCH_TRANSACTIONS);
  }, 500)
})