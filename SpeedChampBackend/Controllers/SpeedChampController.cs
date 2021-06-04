using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ByteSizeLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SpeedChamp.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class SpeedChampController : ControllerBase
  {
    public SpeedChampController()
    {
    }

    [HttpPost("/speedchamp")]
    public async Task<object> SpeedChamp()
    {
      var uploadSize = 20_000_000; //20 megabytes
      var buffer = new byte[uploadSize];
      var len = 0;
      var count = 0;

      var sw = Stopwatch.StartNew();

      // UPLOAD SPEED CHAMP TEST
      while ((len = await Request.Body.ReadAsync(buffer)) > 0)
      {
        count += len;
      }

      sw.Stop();

      if (count == uploadSize)
      {
        var uploadBytesPerSecond = ByteSize.FromBytes(uploadSize / sw.Elapsed.TotalSeconds);

        Console.WriteLine(uploadBytesPerSecond.MebiBytes);
        
        return new
        {
          upload = uploadBytesPerSecond.MebiBytes
        };
      }

      Console.WriteLine(count);

      return new
      {
        upload = -1
      };
    }
  }
}