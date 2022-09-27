```text
Person table
id = Primary Key
/ id / name/
/ 1 / Alice/
/ 2 / Bob/
/ 3 / Carol/
/ 4 / Dave/

Pet table
/ id / name / owner_id (FK)/
/ 1 / Rex / 1 /
/ 2 / Fluffy / 1 /
/ 3 / Spot / 2 /
/ 4 / Fido / 2 /
/ 5 / Rover / 3 /
/ 6 / Spike /  /
```

```sql
-- Get only persons with pets
SELECT person.name, pet.name
FROM person
INNER JOIN pet
ON person.id = pet.owner_id
```

```text
/ name / pet /
/ Alice / Rex /
/ Alice / Fluffy /
/ Bob / Spot /
/ Bob / Fido /
/ Carol / Rover /
```

```sql
-- Get all persons with pets or no pets
SELECT person.name, pet.name
FROM person
LEFT JOIN pet
ON person.id = pet.owner_id
```

```text
/ name / pet /
/ Alice / Rex /
/ Alice / Fluffy /
/ Bob / Spot /
/ Bob / Fido /
/ Carol / Rover /
/ Dave / NULL /
```

```sql
-- Get all pets with owners or not
SELECT person.name, pet.name
FROM person
RIGHT JOIN pet
ON person.id = pet.owner_id
```

```text
/ name / pet /
/ Alice / Rex /
/ Alice / Fluffy /
/ Bob / Spot /
/ Bob / Fido /
/ Carol / Rover /
/ NULL / Spike /
```

```sql
-- Get all pets and all persons
SELECT person.name, pet.name
FROM person
FULL JOIN pet
ON person.id = pet.owner_id
```

```text
/ name / pet /
/ Alice / Rex /
/ Alice / Fluffy /
/ Bob / Spot /
/ Bob / Fido /
/ Carol / Rover /
/ Dave / NULL /
/ NULL / Spike /
```

```sql
-- All pets with no owner
SELECT person.name, pet.name
FROM person
RIGHT JOIN pet
ON person.id = pet.owner_id
WHERE person.name IS NULL
```

```text
/ name / pet /
/ NULL / Spike /
```

```sql
-- All persons with no pets
SELECT person.name, pet.name
FROM person
LEFT JOIN pet
ON person.id = pet.owner_id
WHERE pet.name IS NULL
```

```text
/ name / pet /
/ Dave / NULL /
```

```sql
-- All persons without pet or pet without owner
SELECT person.name, pet.name
FROM person
FULL JOIN pet
ON person.id = pet.owner_id
WHERE person.name IS NULL OR pet.name IS NULL
```

```text
/ name / pet /
/ Dave / NULL /
/ NULL / Spike /
```

```sql
-- Update 'Dave' to have a pet 'Spike'
UPDATE pet
SET owner_id = 4
WHERE id = 6
```

```text
Select * from pet;

/ id / name / owner_id /
/ 1 / Rex / 1 /
/ 2 / Fluffy / 1 /
/ 3 / Spot / 2 /
/ 4 / Fido / 2 /
/ 5 / Rover / 3 /
/ 6 / Spike / 4 /
```

```sql
-- Delete 'Spike'
DELETE FROM pet
WHERE id = 6
```

```text
Select * from pet;

/ id / name / owner_id /
/ 1 / Rex / 1 /
/ 2 / Fluffy / 1 /
/ 3 / Spot / 2 /
/ 4 / Fido / 2 /
/ 5 / Rover / 3 /
```