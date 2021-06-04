using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task SpeedChamp()
        {
            var uploadSize = 20_000_000; //20 megabytes
            var buffer = new byte[uploadSize];
            
            
            
            // stopuhr starten
            // upload einlesen 
            // wenn upload >= 20mb
            // zeit stoppen
            // uploadSize / zeit

            await Task.Delay(1000);
        }
    }
}