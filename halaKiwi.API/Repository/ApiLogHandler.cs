using Dapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Routing;

namespace halaKiwi.API.Repository
{
    public class ApiLogEntry
    {
        public long ApiLogEntryId { get; set; }             // The (database) ID for the API log entry.
        public string Application { get; set; }             // The application that made the request.
        public string User { get; set; }                    // The user that made the request.
        public string Machine { get; set; }                 // The machine that made the request.
        public string RequestIpAddress { get; set; }        // The IP address that made the request.
        public string RequestContentType { get; set; }      // The request content type.
        public string RequestContentBody { get; set; }      // The request content body.
        public string RequestUri { get; set; }              // The request URI.
        public string RequestMethod { get; set; }           // The request method (GET, POST, etc).
        public string RequestRouteTemplate { get; set; }    // The request route template.
        public string RequestRouteData { get; set; }        // The request route data.
        public string RequestHeaders { get; set; }          // The request headers.
        public DateTime? RequestTimestamp { get; set; }     // The request timestamp.
        public string ResponseContentType { get; set; }     // The response content type.
        public string ResponseContentBody { get; set; }     // The response content body.
        public int? ResponseStatusCode { get; set; }        // The response status code.
        public string ResponseHeaders { get; set; }         // The response headers.
        public DateTime? ResponseTimestamp { get; set; }    // The response timestamp.
    }
    public class ApiLogHandler : DelegatingHandler
    {
        
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var apiLogEntry = CreateApiLogEntryWithRequestData(request);
            if (request.Content != null)
            {
                await request.Content.ReadAsStringAsync()
                    .ContinueWith(task =>
                    {
                        apiLogEntry.RequestContentBody = task.Result;
                    }, cancellationToken);
            }

            return await base.SendAsync(request, cancellationToken)
                .ContinueWith(task =>
                {
                    var response = task.Result;

                    // Update the API log entry with response info
                    apiLogEntry.ResponseStatusCode = (int)response.StatusCode;
                    apiLogEntry.ResponseTimestamp = DateTime.Now;

                    if (response.Content != null)
                    {
                        apiLogEntry.ResponseContentBody = response.Content.ReadAsStringAsync().Result;
                        apiLogEntry.ResponseContentType = response.Content.Headers.ContentType.MediaType;
                        apiLogEntry.ResponseHeaders = SerializeHeaders(response.Content.Headers);
                    }
                    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@pRequestUri", apiLogEntry.RequestUri);
                    var multi = con.Query<dynamic>("spKiwi_RequestLoggingApi", param, commandType: CommandType.StoredProcedure);

                    //// TODO: Save the API log entry to the database
                    //string path = "E:/Logging/APILog/Log_" + DateTime.Today.ToString("ddMMMyy") + ".txt";
                    //if (!File.Exists(path))
                    //{
                    //    File.Create(path).Close();
                    //}
                    //using (StreamWriter w = File.AppendText(path))
                    //{
                    //    w.WriteLine("\r\nLog Entry : ");
                    //    //w.WriteLine(apiLogEntry.Machine);
                    //    //w.WriteLine(apiLogEntry.RequestContentBody);
                    //    //w.WriteLine(apiLogEntry.RequestContentType);
                    //    //w.WriteLine(apiLogEntry.RequestHeaders);
                    //    //w.WriteLine(apiLogEntry.RequestIpAddress);
                    //    //w.WriteLine(apiLogEntry.RequestRouteTemplate);
                    //    w.WriteLine(apiLogEntry.RequestUri);
                    //    w.WriteLine("Error Time: {0}", getIndianStandardTime().ToString(CultureInfo.InvariantCulture));
                    //    w.WriteLine("__________________________");
                    //    w.Flush();
                    //    w.Close();
                    //}

                    return response;
                }, cancellationToken);
        }


        public static DateTime getIndianStandardTime()
        {
            TimeZoneInfo IND_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, IND_ZONE);
        }
        private ApiLogEntry CreateApiLogEntryWithRequestData(HttpRequestMessage request)
        {
            var context = ((HttpContextBase)request.Properties["MS_HttpContext"]);
            var routeData = request.GetRouteData();

            return new ApiLogEntry
            {
                Application = "[insert-calling-app-here]",
                User = context.User.Identity.Name,
                Machine = Environment.MachineName,
                RequestContentType = context.Request.ContentType,
                RequestRouteTemplate = routeData.Route.RouteTemplate,
                //RequestRouteData = SerializeRouteData(routeData),
                RequestIpAddress = context.Request.UserHostAddress,
                RequestMethod = request.Method.Method,
                RequestHeaders = SerializeHeaders(request.Headers),
                RequestTimestamp = DateTime.Now,
                RequestUri = request.RequestUri.ToString()
            };
        }

        private string SerializeRouteData(IHttpRouteData routeData)
        {
            return JsonConvert.SerializeObject(routeData, Formatting.Indented);
        }

        private string SerializeHeaders(HttpHeaders headers)
        {
            var dict = new Dictionary<string, string>();

            foreach (var item in headers.ToList())
            {
                if (item.Value != null)
                {
                    var header = String.Empty;
                    foreach (var value in item.Value)
                    {
                        header += value + " ";
                    }

                    // Trim the trailing space and add item to the dictionary
                    header = header.TrimEnd(" ".ToCharArray());
                    dict.Add(item.Key, header);
                }
            }

            return JsonConvert.SerializeObject(dict, Formatting.Indented);
        }

    }
}