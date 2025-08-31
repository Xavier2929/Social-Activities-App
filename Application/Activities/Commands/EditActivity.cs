using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }
    public class Hander(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
            .FindAsync([request.Activity.Id], cancellationToken)
             ?? throw new Exception("Cannot find activity");

            //use automapper https://docs.automapper.io/en/stable/Getting-started.html

            mapper.Map(request.Activity, activity);
            context.Entry(activity).CurrentValues.SetValues(request.Activity);
            await context.SaveChangesAsync(cancellationToken);


        }
    }
}
