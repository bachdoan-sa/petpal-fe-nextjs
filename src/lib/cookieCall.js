export default function getServerSideProps({ req, res }) {
    return { sessionToken: { token: req.cookies.sessionToken || "" } }
}