using devops_test_api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace devops_test_api.Controllers
{
    [ApiController]
    [Route("api/person")]
    public class CrudController: ControllerBase
    {
        private static List<Person> persons = new List<Person>();

        [HttpPost]
        public ActionResult<Person> AddUser(Person person)
        {
            try
            {
                persons.Add(person);
                return person;
            }
            catch
            {
                return BadRequest();
            }

        }
 
        [HttpGet]
        public ActionResult<IEnumerable<Person>> Users()
        {
            //Console.WriteLine(persons.Count());
            return persons.ToArray();
        }

        [HttpPut]

        public ActionResult<Person> EditUser(Person person)
        {
            try
            {
                var a = persons.Find(x => x.person_id == person.person_id);
                persons.Remove(a);
                persons.Add(person);
                return person;
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpDelete]

        public ActionResult<Person> DeleteUser(Person person)
        {
            try
            {
                var a = persons.Find(x => x.person_id == person.person_id);
                if (a == null)
                    throw new Exception();
                persons.Remove(a);
              
                return person;
            }

            catch(Exception)
            {
                return BadRequest();
            }
        }
    }
}
