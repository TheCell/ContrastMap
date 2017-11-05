<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,300i,400,600,700" rel="stylesheet">
	<style type="text/css">
		h1 {
			margin: 0;
			font-family: 'Titillium Web', sans-serif;
			font-size: 40;
			font-weight: 600;
			letter-spacing: 1px;
			padding-top: 40px;
			padding-left: 120px;
			text-transform: uppercase;
			line-height: 1.1;
			display: block;

		}

		#red-title {
			color: rgb(255, 0, 36);
		}

		h2 {
			margin: 0;
			font-family: 'Titillium Web', sans-serif;
			font-size: 13px;
			font-weight: 400;
			letter-spacing: 0.5px;
			color: white;
			padding: 10px;
			text-transform: uppercase;
			width: 230px;

		}

		.button {
			background-color: rgba(0,0,0,0.7);
			/* width: 29vw; */
			display: inline-block;
			border-radius: 16px;
			position: relative;
			bottom: 12px;
		}

		.title {
			width: 70vw;
			display: inline-block;

		}

		img {
			width: 49%;
		}

		body {
			margin: 0;
		}

	</style>

</head>

<body>
	<div>
		<div class="title">
			<h1>10 andere Wege<br>
			<span id="red-title">durch die Viscosistadt</span></h1>
		</div>

		<a href="https://contrastmap.herokuapp.com/">
			<div class="button">
				<h2>Erkunde die Viscosistadt erneut</h2>
			</div>
		</a>
	</div>

	<div style="height:60px;">
	</div>
	<?php
	$images = glob('*.png');

	// display 10 random images
	if (count($images) > 10)
	{
		$imagesKey = array_rand($images, 10);
		foreach ($imagesKey as $key => $value)
		{
			?>
			<img src="<?php echo $images[$value] ?>">
			<?php
		}
	}
	else
	{
		foreach ($images as $key => $value)
		{
			?>
			<img src="<?php echo $value ?>">
			<?php
		}
	}
	?>
</body>

</html>