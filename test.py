import sys
from time import sleep


def solution(s):
    return sum([int(n) for n in s])


def main():
    for line in sys.argv[1:]:
        line = line.strip()
        print(solution(line))
        sleep(100)

if __name__ == '__main__':
    main()
