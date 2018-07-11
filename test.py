
def fibo(x):
	if x == 1:
		return 1
	if x == 2:
		return 2
	else:
		return fibo(x-1) + fibo(x-2)


print fibo(80)
#print fibo(40)
