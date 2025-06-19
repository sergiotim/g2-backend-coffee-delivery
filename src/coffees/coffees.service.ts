import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { connect } from 'http2';

@Injectable()
export class CoffeesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const coffees = await this.prisma.coffee.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return coffees.map((coffee) => ({
      ...coffee,
      tags: coffee.tags.map((coffeeTag) => coffeeTag.tag),
    }));
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    return {
      ...coffee,
      tags: coffee.tags.map((coffeeTag) => coffeeTag.tag),
    };
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const { tagIds, ...coffeeData } = createCoffeeDto;

    return this.prisma.coffee.create({
      data: {
        ...coffeeData,
        tags: {
          create: tagIds.map((tagId) => ({
            tag: {
              connect: {
                id: tagId, // Conecta o Coffee à Tag existente pelo ID
              },
            },
          })),
        },
      },
      include: {
        tags: {
          include: {
            tag: true, // Inclui os detalhes das tags conectadas
          },
        },
      },
    });
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // código de implementação aqui
    this.findOne(id);

    // Atualizar os dados do café
    return this.prisma.coffee.update({
      where: { id },
      data: updateCoffeeDto, // seu dados atualziados iserir aqui
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    //  1 - Verificar se o café existe
    this.findOne(id);

    // 2 - Remover o café
    return this.prisma.coffee.delete({
      where: { id },
    });
  }

  async searchCoffees(params: {
    start_date?: Date;
    end_date?: Date;
    name?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }) {
    const { start_date, end_date, name, tags, limit = 10, offset = 0 } = params;

    // Construir o filtro
    const where: any = {};

    // Filtro por data
    if (start_date || end_date) {
      where.createdAt = {};
      if (start_date) {
        where.createdAt.gte = start_date;
      }
      if (end_date) {
        where.createdAt.lte = end_date;
      }
    }

    // Filtro por nome

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    // Filtro por tags
    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          tag: {
            name: {
              in: tags,
            },
          },
        },
      };
    }

    // Buscar os cafés com paginação
    const [coffees, total] = await Promise.all([
      this.prisma.coffee.findMany({
        where,
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.coffee.count({ where }),
    ]);

    // Formatar a resposta
    return {
      data: coffees.map((coffee) => ({
        ...coffee,
        tags: coffee.tags.map((coffeeTag) => coffeeTag.tag),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }
}
