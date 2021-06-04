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
            await Task.Delay(1000);
        }
    }
}