// import React from "react"
// import { graphql } from "gatsby"
// import Layout from "../Layout"
// import GoogleMap from "../Map"
// import markerIcon from "../../images/gatsby-icon.png"
// import FormFields from "../FormFields"

// const ActivityPageTemplate = ({
//   data: { activity },
//   pageContext: { slug },
// }) => {
//   const close_date = new Date(activity.acf.close_date)
//   const now = new Date()

//   return (
//     <Layout>
//       <h1>{activity.title}</h1>
//       <div dangerouslySetInnerHTML={{ __html: activity.content }} />
//       {activity.acf.has_location && (
//         <div>
//           <h3>locatie:</h3>
//           <h2>{activity.acf.location[0].title}</h2>
//           <p>{activity.acf.location[0].acf.address.address}</p>
//           <div style={{ height: "500px" }}>
//             <GoogleMap
//               apiKey="AIzaSyDujkg0Ss-J1rQFNy-J1B2S7sgcpdbjXek"
//               location={{
//                 lat: Number(activity.acf.location[0].acf.address.lat),
//                 lng: Number(activity.acf.location[0].acf.address.lng),
//               }} //{activity.acf.location[0].acf.address}
//               markerIcon={markerIcon}
//               markerInfoComponent={
//                 <a href="https://www.google.com/maps/dir//Stationsstraat+95,+9100+Sint-Niklaas,+Belgium">
//                   directions
//                 </a>
//               }
//               options={{
//                 center: {
//                   lat: Number(activity.acf.location[0].acf.address.lat),
//                   lng: Number(activity.acf.location[0].acf.address.lng),
//                 }, //activity.acf.location[0].acf.address,
//                 zoom: 15,
//                 disableDefaultUI: true,
//                 styles: [],
//               }}
//             />
//           </div>
//         </div>
//       )}
//       {activity.acf.hasform &&
//         (close_date < now ? (
//           <p>inschrijvingen gesloten</p>
//         ) : (
//           <div>
//             <h3>inschrijven:</h3>
//             <form
//               name={activity.wordpress_id}
//               method="POST"
//               data-netlify="true"
//               data-netlify-honeypot="bot-field"
//               action="/thanks"
//             >
//               <input
//                 type="hidden"
//                 name="form-name"
//                 value={activity.wordpress_id}
//               />
//               <input type="hidden" name="bot-field" />
//               <input
//                 type="hidden"
//                 name="activity_id"
//                 value={activity.wordpress_id}
//               />
//               {activity.acf.register_form.map((form, i) => (
//                 <FormFields
//                   postContent={form.post_content}
//                   key={i}
//                   formId={form.id}
//                 />
//               ))}
//               <button>send</button>
//             </form>
//           </div>
//         ))}
//     </Layout>
//   )
// }

// export default ActivityPageTemplate

// export const query = graphql`
//   query($slug: String!) {
//     activity: wordpressWpActivities(slug: { eq: $slug }) {
//       title
//       content
//       wordpress_id
//       acf {
//         has_location
//         location {
//           title: post_title
//           slug: post_name
//           acf {
//             address {
//               address
//               lat
//               lng
//             }
//           }
//         }
//         hasform
//         close_date
//         register_form {
//           post_content
//         }
//       }
//     }
//   }
// `
