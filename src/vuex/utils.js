//修改数据
export const IndexList = (data) => {
    let bigdata = [],
        rightArr = ["#"];
    data.map((item, ind) => {
        let Up = item.Spelling.slice(0, 1);
        if (!rightArr.includes(Up)) {
            rightArr.push(Up)
        }
    })
    rightArr.map((item, ind) => {
        let obj = {};
        let list = [];
        data.map((Item, ind) => {
            if (Item.Spelling.slice(0, 1) === item) list.push(Item);
        })
        obj.tit = item;
        obj.list = list;
        bigdata.push(obj);
    })
    return {
        list: bigdata,
        rightList: rightArr
    }
}