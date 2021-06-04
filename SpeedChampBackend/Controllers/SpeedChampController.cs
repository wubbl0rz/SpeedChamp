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
    
    // [HttpPost("/ping")]
    // public async Task<object> Ping()
    // {
    // }

    [HttpGet("/down")]
    public async Task Down()
    {
      var downloadSize = 20_000_000; //20 megabytes
      var buffer = new byte[downloadSize];

      var sw = Stopwatch.StartNew();
      
      await Response.Body.WriteAsync(buffer);
      
      sw.Stop();
      
      var downloadBytesPerSecond = ByteSize.FromBytes(downloadSize / sw.Elapsed.TotalSeconds);
      var downloadMBitsPerSecond = downloadBytesPerSecond.Bits / 1_000_000;

      Console.WriteLine($"DOWNLOAD SPEED: {downloadMBitsPerSecond} Mbit/s");
    }

    [HttpPost("/up")]
    public async Task<object> Up()
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
        var uploadMBitsPerSecond = uploadBytesPerSecond.Bits / 1_000_000;
        
        Console.WriteLine($"UPLOAD SPEED: {uploadMBitsPerSecond} Mbit/s");
        
        return new
        {
          upload = uploadMBitsPerSecond
        };
      }

      throw new Exception("KEKWait");
    }
  }
}