// import type {NextApiRequest, NextApiResponse} from 'next'
// import  cookie  from ;

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const body = req.body;
//     const sessionToken = body.jwt;
//     const expiresAt = null;
//     const role = body.role;
//     console.log("req" + req);
//     console.log("body" + body);
//     console.log("token" + sessionToken);
//     if (!sessionToken) {
//       res.status(400).json({
//         message: 'Không nhận được session token'
//       }, {
//         status: 400
//       })
//     }
//     // const expiresDate = new Date(expiresAt).toUTCString();
//     res.json(body, {
//       status: 200,
//       headers: {
//         'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Secure`
//         // 'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
//       }
//     })
//     res.setHeader('Set-Cookie', cookie.serialize('viewedWelcomeMessage', 'true'))
//   } else {
//     // Handle any other HTTP method
//   }

// }
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method === 'POST') {
    const body = req.body;
    const sessionToken = body.jwt;
    const expiresAt = null;
    const role = body.role;
    if (!sessionToken) {
      res.status(400).json({ message: 'Không nhận được session token' });
    }
    const viewedWelcomeMessage = req.cookies.viewedWelcomeMessage;
    if (viewedWelcomeMessage === "true") {
      return res.status(200).json({ message: "Welcome back!" });
    }

    res.setHeader('Set-Cookie', `sessionToken=${sessionToken}; Path=/;HttpOnly; SameSite=Lax; Secure`);
    return res.status(200).json(body);
  }
  else {
    return res.status(400).json({ message: "Wrong method http" });
  }

}