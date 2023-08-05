/*
 * kks.libparser
 * ~~~~~~~~~~~~~
 *
 * Parse post source, set the struct instance's data:
 *
 *     title, time, tag, body
 *
 * If error, return negative int, else return 0;
 */

typedef struct post {
    char *title;        /* title */
    char *time;         /* time */
    char *tag;          /* tag */
    char *body;         /* markdown body */
    int titlesz;        /* title size */
    int timesz;         /* time size */
    int tagsz;          /* tag size */
} post_t;

/*
 *  return:
 *      0       ok
 *      -1      separator not found
 *      -2      title not found
 *      -3      time not found
 *      -4      tag not found
 */

int parse(post_t *t, char *src)
{
    /*
     * find separator
     */
    char *p = src, *e = src;
    int separator_found = 0;  //was the separator found?

    while (*p != '\0') {
        while (*p == ' ' || *p == '\t') p++;  //skip spaces

        if (*p == '-' && *(p+1) == '-' && *(p+2) == '-') {  // meet a '---'
            while (*p == '-') p++;  // skip the rest '-'
            while (*p == ' ' || *p == '\t') p++;  // skip spaces
            if (*p == '\n' || *p == '\0') {
                separator_found = 1; // separator is this line, p is the last char of this line
                break;
            }
        }

        // current line is illegal, go to next line
        for (; *p != '\0' && *p != '\n'; p++);
        e = p;
        p++;
    }

    if (!separator_found) return -1;

    //skip empty
    while (*p == '\n' || *p == '\t' || *p == ' ') p++;

    t->body = p; // got the  markdown body

    /*
     *  find title
     */
    char *q = src, *x, *y;

    while (q < e && (*q == ' ' || *q == '\t' || *q == '\n')) q++;

    if (q != e) t->title = x = q;  // the first non-space char
    else
        return -2;  // no title found

    while (q < e && *q != '\n') q++; //seek to line end

    // find the last non-space char in this line
    for (y=q-1; y > x && (*y == ' ' || *y == '\t'); y--);

    t->titlesz = (int)(y - x + 1);

    /*
     * find time
     */
    while (q < e && (*q == ' ' || *q == '\t' || *q == '\n')) q++;

    if (q != e) t->time = x = q;
    else {  // No time  found, return
        return -3;
    }

    while (q < e && *q != '\n') q++; //seek to line end

    // find the last non-space char in this line
    for (y=q-1; y > x && (*y == ' ' || *y == '\t'); y--);

    t->timesz = (int)(y - x + 1);

    /*
     * find tag
     */
    while (q < e && (*q == ' ' || *q == '\t' || *q == '\n')) q++;

    if (q != e) t->tag = x = q;
    else {  // No tag  found, return
        return -4;
    }

    while (q < e && *q != '\n') q++; //seek to line end

    // find the last non-space char in this line
    for (y=q-1; y > x && (*y == ' ' || *y == '\t'); y--);

    t->tagsz = (int)(y - x + 1);

    return 0;
}
