export const maanden = [
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December",
]

export const postTypes = {
  ruimte: "ruimte",
  ruimte_artikel: "artikel",
  activiteit: "activiteit",
  prijs: "prijsuitreiking",
  post: "nieuws",
  blog: "blog",
  job_listing: "vacature",
}

export const getPathname = post => {
  const typeName = postTypes[post.post_type]

  let itemSlug = "/"

  if (post.post_type === "ruimte_artikel") {
    itemSlug += `ruimte/${post.acf.ruimte.post_name}/`
  } else if (post.post_type !== "page") {
    itemSlug += `${typeName}`
  }

  if (post.post_type === "page") {
    itemSlug = post.pathname
  } else if (post.post_type === "post") {
    itemSlug += post.pathname
  } else {
    itemSlug += `/${post.post_name}`
  }

  return itemSlug
}

export const getPostLabel = (post, multiTypes) => {
  let label = ""
  // check post type
  if (post.post_type === "post") {
    //if post = news (post) always add label and date
    label = `${post.acf.nieuws_type_label} | ${post.post_date}`
  } else {
    if (multiTypes) {
      label = postTypes[post.post_type]
    }
    if (post.post_type === "activiteit" && post.acf.date) {
      if (multiTypes) {
        label += " | "
      }
      label += post.acf.dateFormatted
    }
  }

  return label
}
