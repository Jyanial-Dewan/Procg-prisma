import app from "./app";

const port = process.env.PORT || 4567;

app.listen(port, () => {
    console.log(`the server is runnining in port ${port}`)
})