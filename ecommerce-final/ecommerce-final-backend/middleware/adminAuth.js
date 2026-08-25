import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not authorized, please login as admin" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // adminLogin signs the raw "email+password" string, not an object,
        // so we check the decoded value matches the real admin credentials.
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not authorized as admin" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid or expired admin token" });
    }
}

export default adminAuth;