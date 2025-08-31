using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }


    }

    public class Hander(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Id], cancellationToken)
                        ?? throw new InvalidOperationException("Cannot find activity.");
            context.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
