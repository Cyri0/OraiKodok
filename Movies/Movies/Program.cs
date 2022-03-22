using System;
using System.Collections.Generic;
using System.IO;

namespace Movies
{
    class Movie
    {
        public string revenue, vote_average, vote_count, title, original_language, release_date, production_companies, production_countries, genres, director, producer, cast, runtimes, writer;

        public Movie(string line)
        {
            string[] parts = line.Split(';');
            revenue = parts[0];
            vote_average = parts[1];
            vote_count = parts[2];
            title = parts[3];
            original_language = parts[4];
            release_date = parts[5];
            production_companies = parts[6];
            production_countries = parts[7];
            genres = parts[8];
            director = parts[9];
            producer = parts[10];
            cast = parts[11];
            runtimes = parts[12];
            writer = parts[13];
        }

        public int getYear()
        {
            try
            {
                int year = int.Parse(release_date.Split('.')[0]);
                return year;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }

    class Program
    {
        static void searchTitle(string title, List<Movie> movies)
        {
            foreach (Movie item in movies)
            {
                if(item.title.Contains(title))
                    Console.WriteLine(item.title);
            }
        }

        static void searchDirector(string director, List<Movie> movies)
        {
            foreach (Movie item in movies)
            {
                if (item.director.Contains(director))
                    Console.WriteLine($"{item.title} ({item.getYear()})");
            }
        }

        static void searchYear(string year, List<Movie> movies)
        {
            int year_i = int.Parse(year);
            foreach (Movie item in movies)
            {
                if(item.getYear() == year_i)
                {
                    Console.WriteLine($"{item.title} ({item.getYear()})");
                }
            }
        }



        static void Main(string[] args)
        {
            List<Movie> movies = new List<Movie>();

            foreach (string line in File.ReadAllLines("movies.txt"))
            {
                try { movies.Add(new Movie(line)); }
                catch (Exception e) {
                    Console.WriteLine("HIBÁS: "+ e.Message);
                }
            }


            // KEZELŐFELÜLET
            string command = "";
            while(command != "END")
            {
                Console.Write("$:");
                command = Console.ReadLine();

                string[] parts = command.Split(':');
                if(parts[0] == "title")
                {
                    searchTitle(parts[1], movies);
                } else if(parts[0] == "year")
                {
                    searchYear(parts[1], movies);
                } else if(parts[0] == "director")
                {
                    searchDirector(parts[1], movies);
                }
            }

        }
    }
}
