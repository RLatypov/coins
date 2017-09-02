const where = (obj, coll) => {
    return coll.filter(x => {
        return Object.keys(obj).every(k => obj[k] === x[k]);
    });
};

export { where };
