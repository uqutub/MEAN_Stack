/// <reference path="./../../typings/tsd.d.ts" />
//function return json (Call Back Function)
function ReturnJson(req, res) {
    function exResponse(err, obj) {
        //If err return
        if (err) {
            return res.json({ status: 404, message: 'Error: code 10x1' });
        } //if err closing
        if (typeof obj == 'object') {
            obj["status"] = 200;
            obj["message"] = '';
            return res.json(obj);
        } //if obj closing
        if (typeof obj == 'number') {
            var sendObj = { status: 200, message: 'Successfully Updated ' + obj.toString() + ' rows' };
            return res.json(sendObj);
        } // if number closing
        //if no err and no obj (like in mongosse add, delete)
        if (!err) {
            var sendObj = { status: 200, message: '' };
            return res.json(sendObj);
        }
        //else
        return res.send("Sumthing Going Worng, Contact to your Administrator, Error: code 20x1");
    } // function exResponse closing
    return exResponse;
}
exports.ReturnJson = ReturnJson; //ReturnJson Closing
;
