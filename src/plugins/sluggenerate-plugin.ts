const generateSlug = (str: string, options: {
    lowercase?: boolean,
    trim?: boolean,
    removedspecial?: boolean,
    replacewithhyphens?: boolean,
    firstThreeUppercase?: boolean
}): string => {
    let slug = str;

    if (options.lowercase) {
        slug = slug.toLowerCase();
    }
    if (options.removedspecial) {
        slug = slug.replace(/[^a-z0-9A-Z\s-]/g, '');
    }
    if (options.replacewithhyphens) {
        slug = slug.replace(/\s+/g, '-');
    }
    if (options.firstThreeUppercase) {
        let slugwith3 = str.slice(0, 3);
        slug = slugwith3.toUpperCase();
    }
    slug = slug.replace(/\s+/g, '_');
    return slug;
};

export default generateSlug;
