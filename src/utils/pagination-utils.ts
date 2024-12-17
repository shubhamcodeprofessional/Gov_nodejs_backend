
export function getPagination(query: any) {
    const page = parseInt(query.page ?? "1");
    const limit = parseInt(query.limit ?? "10");
    const offset = (page - 1) * limit;
    delete query.page;
    delete query.limit;

    return { page, limit, offset };
}