import express from "express";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import * as child from "child_process"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
let ans = ""

function exec_prog(expression) {
    let p = child.spawn('java', ['-jar', resolve(__dirname + '/../LinAlg.jar')]).on('error', function(err) { console.log(err); });
    p.stdout.on('data', (data) => {
        ans = data.toString();
    });
    p.stdin.write(String(expression));
    p.stdin.end();
}

router.get("/",  (req, res) => {
   res.sendFile(resolve(__dirname + '/../static/home.html')) 
});

router.post("/", (req, res) => {
    exec_prog(req.body.expression);

    return res.json({
        answer: ans,
    });
});

export default router;