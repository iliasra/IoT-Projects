dossier = 'uploads/';
contenuDossier = dir(fullfile(dossier, '*.jpg'));  % Remplacez '*.jpg' par le format de votre photo
nomFichier = contenuDossier(1).name;
cheminFichier = fullfile(dossier, nomFichier);

I = imread(cheminFichier);
I = rgb2gray(I);
corners = detectMinEigenFeatures(I, "MinQuality", 0.42, "FilterSize", 5);

[features,valid_corners] = extractFeatures(I,corners);
figure;
imshow(I); 
hold on
plot(valid_corners.selectStrongest(50));
num_corners = corners.Count;
estimate_obstacle_number = num_corners/12;
danger_rate = 30*estimate_obstacle_number;
if (0<danger_rate) && (danger_rate<15)
    danger_rate = 0
end
if (15<=danger_rate) && (danger_rate<=45)
    danger_rate = 30
end
if (45<danger_rate) && (danger_rate<=75)
    danger_rate = 60
end
if (75<danger_rate) && (danger_rate<=95)
    danger_rate = 90
end
if danger_rate > 95
    danger_rate = 100
end

file_path = 'C:\Users\ilias\Desktop\Projet RIO203\output.txt';

fileID = fopen(file_path, 'w');
fprintf(fileID, '%d\n', danger_rate);
fclose(fileID);
%fileID = fopen(file_path, 'w');
%fprintf(fileID, '%d\n', danger_rate);
%fclose(fileID);


file_path = 'C:\Users\ilias\Desktop\Projet RIO203\corners.txt';

fileID = fopen(file_path, 'a');
fprintf(fileID, 'nb coins : %d\n', num_corners);
fclose(fileID);


%try
%    delete(cheminFichier);
%    disp(['Le fichier ', cheminFichier, ' a été supprimé avec succès.']);
%catch
%    error(['Erreur lors de la suppression du fichier ', cheminFichier]);
%end
